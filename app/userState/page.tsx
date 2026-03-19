'use client';

import { useSelector } from 'react-redux';

export default function UserStatePage() {
    const user = useSelector((state: RootState) => state.user);
    return <div>UserStatePage</div>;
}