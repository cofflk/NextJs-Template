"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/src/lib/redux/store";
import { logout } from "@/src/lib/redux/features/user/userSlice";

import styles from "./header.module.scss";

function initialsFromName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedin, userName } = useSelector((state: RootState) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const avatarLabel = isLoggedin && userName ? initialsFromName(userName) : "?";

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href="/" className={styles.ciLink}>
          CI
        </Link>

        <div className={styles.right}>
          <label className={styles.searchLabel}>
            <span className={styles.srOnly}>검색</span>
            <span className={styles.searchIconWrap}>
              <svg
                className={styles.searchIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="search"
              placeholder="검색…"
              className={styles.searchInput}
            />
          </label>

            <div className={styles.userWrap} ref={menuRef}>
                <button
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label={
                    isLoggedin && userName
                    ? `사용자 메뉴, ${userName}`
                    : "사용자 메뉴"
                }
                onClick={() => setMenuOpen((v) => !v)}
                className={styles.userTrigger}
                >
                <span className={styles.avatar}>{avatarLabel}</span>
                <span className={styles.displayName}>
                    {isLoggedin && userName ? userName : "게스트"}
                </span>
                </button>

                {menuOpen && (
                <div role="menu" className={styles.dropdown}>
                    {isLoggedin && userName ? (
                    <p className={styles.menuHeader}>{userName}</p>
                    ) : (
                    <p className={styles.menuHeader}>로그인되지 않음</p>
                    )}
                    <button
                    type="button"
                    role="menuitem"
                    className={styles.menuItem}
                    onClick={() => {
                        closeMenu();
                    }}
                    >
                    내 정보
                    </button>
                    <button
                    type="button"
                    role="menuitem"
                    className={styles.menuItemDanger}
                    onClick={() => {
                        dispatch(logout());
                        closeMenu();
                    }}
                    >
                    로그아웃
                    </button>
                </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}
