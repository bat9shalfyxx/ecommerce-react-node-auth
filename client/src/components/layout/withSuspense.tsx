import { type ComponentType, type LazyExoticComponent, Suspense } from 'react';

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component />
        </Suspense>
    );
};

export default withSuspense;
