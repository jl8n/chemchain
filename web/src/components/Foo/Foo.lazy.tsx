import React, { lazy, Suspense } from 'react';

const LazyFoo = lazy(() => import('./Foo'));

const Foo = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFoo {...props} />
  </Suspense>
);

export default Foo;
