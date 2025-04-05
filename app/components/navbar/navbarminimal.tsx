'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
  { link: '/seo_', label: 'SEO Optimization', icon: IconSeo },
  { link: '/updatecontent', label: 'Content Update', icon: IconEdit },
  { link: '/content_add', label: 'Content Add', icon: IconDatabasePlus },
  { link: '/broken_links', label: 'Broken Link Provider', icon: IconDatabasePlus },
];

export function NavbarMinimal() {
  // Get current pathname from Next.js router
  const pathname = usePathname();

  // Use <Link> instead of <a> to enable client-side navigation
  const links = data.map((item) => (
    <li key={item.label}>
      <Link
        href={item.link}
        className={`${classes.link} ${pathname === item.link ? classes.active : ''}`}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    </li>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700} className={classes.version}>v3.1.2</Code>
          <ActionToggle />
        </Group>
        <ul className={classes.linkList}>
          {links}
        </ul>
        <style jsx>{`
          .navbar {
            background-color: #f0f0f0;
            padding: 1rem;
            border-bottom: 1px solid #ddd;
          }
          .navbarMain {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .linkList {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .linkList li {
            margin: 0 1rem;
          }
          .linkList a {
            color: #333;
            text-decoration: none;
          }
          .linkList a:hover {
            color: #666;
          }
        `}</style>
      </div>
    </nav>
  );
}
