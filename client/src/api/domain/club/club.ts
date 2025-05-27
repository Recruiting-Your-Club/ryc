const BASE_URL = process.env.BASE_URL;
const getAllClubs = async () => {
    const res = await fetch(`${BASE_URL}/clubs/all`);

    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
};
export { getAllClubs };
