'use client'

import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
    const { user } = useUser();
    return (
        <div>
            <p>{user?.emailAddresses[0]?.emailAddress}</p>
        </div>
    )
}
