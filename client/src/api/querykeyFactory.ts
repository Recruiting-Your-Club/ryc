/** 예시입니다. 나중에 지울게용
const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
}

queryClient.removeQueries({
  queryKey: todoKeys.all
})

// 🚀 invalidate all the lists
queryClient.invalidateQueries({
  queryKey: todoKeys.lists()
})

// 🙌 prefetch a single todo
queryClient.prefetchQueries({
  queryKey: todoKeys.detail(id),
  queryFn: () => fetchTodo(id),
})
*/

const clubKeys = {
    all: ['clubs'] as const,
    detail: (id: string) => ['detail', id] as const,
};

const myClubKeys = {
    all: ['clubs'] as const,
};

const applicationKeys = {
    all: ['application'] as const,
    detail: (id: string) => ['detail', id] as const,
};

const announcementKeys = {
    all: ['announcement'] as const,
    lists: (clubId: string) => [...announcementKeys.all, 'list', clubId] as const,
    detail: (id: string) => ['detail', id] as const,
};

export { clubKeys, myClubKeys, applicationKeys, announcementKeys };
