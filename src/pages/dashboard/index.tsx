import React, { useEffect } from 'react';
import styles from './styles.less';

const Dashboard: React.FC = () => {
  useEffect(() => {
    console.log(' Dashboard-useEffect');
  }, []);
  return <div className={styles.container}>首页</div>;
};

export default Dashboard;
