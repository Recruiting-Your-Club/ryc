import type {
    ComponentProps,
    HTMLAttributes,
    MutableRefObject,
    ReactElement,
    ReactNode,
    Ref,
    RefCallback,
} from 'react';
import React, { Children, cloneElement, Fragment, isValidElement } from 'react';

//------------------------------------//
//Slot 컴포넌트
//------------------------------------//
interface SlotProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    forwardedRef: Ref<HTMLElement>;
}

/**
 * asChild 진입점
 * @param param0
 */
function Slot({ children, forwardedRef, ...props }: SlotProps) {
    //children이 여러개일 수 있으니 배열로 만든 후 Slottable 존재 여부 감지
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    //만약 slottable이 있다면?
    if (slottable) {
        //Slottable 자식 요소를 newElement에 할당
        const newElement = slottable.props.children;

        //chlidrenArray 돌면서 새로운 자식 요소 생성
        //Slottable 컴포넌트가 발견되면 자식요소를 newElement로 교체
        const newChildren = childrenArray.map((child) => {
            if (child === slottable) {
                if (Children.count(newElement) > 1) {
                    return Children.only(null); //강제 에러 발생 장치
                }

                return isValidElement(newElement) ? (newElement.props.children as ReactNode) : null;
            } else {
                return child;
            }
        });

        return (
            <SlotClone {...props} forwardedRef={forwardedRef}>
                {isValidElement(newElement)
                    ? cloneElement(newElement, undefined, newChildren)
                    : null}
            </SlotClone>
        );
    }

    return (
        <SlotClone {...props} forwardedRef={forwardedRef}>
            {children}
        </SlotClone>
    );
}

//------------------------------------//
//SlotClone 컴포넌트
//------------------------------------//
interface SlotCloneProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    forwardedRef: Ref<HTMLElement>;
}

//자식 컴포넌트 클론 및 props/ref 병합해주는 컴포넌트
function SlotClone({ children, forwardedRef, ...slotProps }: SlotCloneProps) {
    if (isValidElement(children)) {
        const childrenRef = getElementRef(children);
        const mergedProps = mergeProps(slotProps, children.props);
        const ref = mergeRefs(childrenRef, forwardedRef);

        //Fragment는 ref가 없으니 예외처리
        if (children.type !== Fragment) {
            mergedProps.ref = ref;
        }

        return cloneElement(children, mergedProps);
    }

    //children이 유일한 React 요소가 아니거나, children이 여러개일 경우 null 반환
    //children이 단일요소일 때만 처리되도록 하기 위해
    return Children.count(children) > 1 ? Children.only(null) : null;
}

//------------------------------------//
//Slottable 컴포넌트
//------------------------------------//
//asChild 대상 자식 컴포넌트를 명시해주는 컴포넌트
function Slottable({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

//Slottable인지 확인해주는 함수
function isSlottable(
    child: ReactNode,
): child is ReactElement<ComponentProps<typeof Slottable>, typeof Slottable> {
    return isValidElement(child) && child.type === Slottable;
}

//자식 element ref 추출해주는 함수
function getElementRef(element: ReactElement): Ref<unknown> | undefined {
    // eslint-disable-next-line
    return (element as any).ref;
}

//cloneElement 사용하면 자식 컴포넌트의 props가
//부모 컴포넌트의 동일한 네이밍인 props에 의해 덮어쓰기 되면서 사라지는 상황 발생
// -> ex) Trigger의 onClick과 자식 컴포넌트의 onClick 이벤트가 있을 경우 자식 컴포넌트의 onClick 무시됨
//부모 컴포넌트와 자식 컴포넌트의 props를 수동으로 병합시켜주는 함수 필요
type MergeableProps = Record<string, unknown>;
function mergeProps(slotProps: MergeableProps, childProps: MergeableProps) {
    const overrideProps = { ...childProps };

    for (const propName in childProps) {
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];

        //이벤트 핸들러 정의
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (isFunction(slotPropValue) && isFunction(childPropValue)) {
                overrideProps[propName] = (...args: unknown[]) => {
                    childPropValue(...args);
                    slotPropValue(...args);
                };
            } else if (isFunction(slotPropValue)) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === 'style' && isObject(slotPropValue) && isObject(childPropValue)) {
            overrideProps[propName] = { ...slotPropValue, ...childPropValue };
        } else if (propName === 'css') {
            overrideProps[propName] = Array.isArray(childPropValue)
                ? [...childPropValue, slotPropValue].filter(Boolean)
                : [childPropValue, slotPropValue].filter(Boolean);
        }
    }

    return { ...slotProps, ...overrideProps };
}

//value가 object 타입임을 명시해주기 위해 사용 (스프레드연산자를 사용하기 위해)
//unknown 타입이면 스프레드연산자 사용 못함
function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isFunction(value: unknown) {
    return typeof value === 'function';
}

//cloneElement로 자식을 복제할 때 ref를 덮어쓰면 기존 ref 사라짐
//즉, cloneElement할 때 forwardedRef가 있다면 별도로 ref를 합치는 로직 필요
function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
    return (node) => {
        const cleanups: (void | (() => void))[] = refs.map((ref) => {
            setRef(ref, node);
        });

        return () => {
            for (let i = 0; i < refs.length; i++) {
                const cleanup = cleanups[i];
                if (typeof cleanup === 'function') {
                    cleanup();
                } else {
                    setRef(refs[i], null);
                }
            }
        };
    };
}

//ref가 refObject와 Callback Ref일 때 구분 없이 값 대입
function setRef<T>(ref: Ref<T> | undefined, value: T) {
    if (typeof ref === 'function') {
        return ref(value);
    } else if (ref !== null && ref !== undefined) {
        //ref의 refObject의 read-only 속성 벗기기 위해 타입 강제
        (ref as MutableRefObject<T>).current = value;
    }
}

export { Slot, Slottable };
