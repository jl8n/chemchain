import React, { FC } from 'react';
import styles from './Foo.module.scss';

interface FooProps {}

const Foo: FC<FooProps> = () => (
  <div className={styles.Foo}>
    Foo Component
  </div>
);

export default Foo;
