import type { FC } from 'react';
import { useEffect } from 'react';
import styles from './styles.less';

const User: FC = () => {
  useEffect(() => {
    console.log(' User-useEffect');
  }, []);
  return <div className={styles.user_container}>人员管理</div>;
};

export default User;
