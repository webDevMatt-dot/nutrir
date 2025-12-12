import { Suspense } from 'react';
import Policies from "./Policies";

export default function PoliciesPage() {
    return (
        // Wrap the Client Component that uses useSearchParams
        <Suspense>
            <Policies />
        </Suspense>
    );
}
