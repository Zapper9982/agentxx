'use client'
import { useState } from 'react';
import {
  IconHome,
  IconLayoutDashboard,
  IconSeo,
  IconEdit,
  IconDatabasePlus,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './navbarminimal.module.css';
import { ActionToggle } from '../darkmode/ActionToggle';

const data = [
  { link: '', label: 'Home', icon: IconHome },
  { link: '', label: 'Dashboard', icon: IconLayoutDashboard },
  { link: '', label: 'SEO Optimization', icon: IconSeo },
  { link: '', label: 'Content Update', icon: IconEdit },
  { link: '', label: 'Content Add', icon: IconDatabasePlus },
];

export function NavbarMinimal() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>
      <div><ActionToggle/></div>
      
    </nav>
  );
}