"use client";

import { useMemo, useState } from "react";

export type NavigationMenu = {
  menuCode: string;
  menuName: string;
  parentCode: string;
  rootValue: number;
};

type TreeNode = NavigationMenu & {
  children: TreeNode[];
};

type NavigationProps = {
  menus?: NavigationMenu[];
};

const defaultMenus: NavigationMenu[] = [
  { menuCode: "dashboard", menuName: "대시보드", parentCode: "", rootValue: 0 },
  { menuCode: "user", menuName: "사용자 관리", parentCode: "", rootValue: 0 },
  { menuCode: "user-list", menuName: "사용자 목록", parentCode: "user", rootValue: 1 },
  { menuCode: "user-role", menuName: "권한 설정", parentCode: "user", rootValue: 1 },
  { menuCode: "setting", menuName: "환경 설정", parentCode: "", rootValue: 0 },
  { menuCode: "setting-site", menuName: "사이트 설정", parentCode: "setting", rootValue: 1 },
  { menuCode: "setting-log", menuName: "로그 관리", parentCode: "setting", rootValue: 1 },
];

function buildTree(menus: NavigationMenu[]): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const menu of menus) {
    nodeMap.set(menu.menuCode, { ...menu, children: [] });
  }

  for (const menu of menus) {
    const node = nodeMap.get(menu.menuCode);
    if (!node) continue;

    const isRoot = menu.rootValue === 0 || !menu.parentCode;
    if (isRoot) {
      roots.push(node);
      continue;
    }

    const parent = nodeMap.get(menu.parentCode);
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

type TreeItemProps = {
  node: TreeNode;
  expanded: Set<string>;
  onToggle: (code: string) => void;
};

function TreeItem({ node, expanded, onToggle }: TreeItemProps) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expanded.has(node.menuCode);

  return (
    <li style={{ marginBottom: 6 }}>
      {hasChildren ? (
        <button
          type="button"
          onClick={() => onToggle(node.menuCode)}
          style={{
            width: "100%",
            textAlign: "left",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "4px 6px",
            fontSize: 14,
            color: "#111827",
            fontWeight: 600,
          }}
        >
          {isExpanded ? "▾ " : "▸ "}
          {node.menuName}
        </button>
      ) : (
        <div
          style={{
            padding: "4px 6px 4px 20px",
            fontSize: 14,
            color: "#374151",
          }}
        >
          {node.menuName}
        </div>
      )}

      {hasChildren && isExpanded && (
        <ul
          style={{
            listStyle: "none",
            margin: "6px 0 0",
            padding: "0 0 0 12px",
            borderLeft: "1px solid #d1d5db",
          }}
        >
          {node.children.map((child) => (
            <TreeItem
              key={child.menuCode}
              node={child}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Navigation({ menus = defaultMenus }: NavigationProps) {
  const tree = useMemo(() => buildTree(menus), [menus]);

  const [expanded, setExpanded] = useState<Set<string>>(
    () =>
      new Set(
        menus
          .filter((menu) => menu.rootValue === 0 || !menu.parentCode)
          .map((menu) => menu.menuCode),
      ),
  );

  const toggleNode = (menuCode: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(menuCode)) {
        next.delete(menuCode);
      } else {
        next.add(menuCode);
      }
      return next;
    });
  };

  return (
    <aside
      aria-label="좌측 네비게이션"
      style={{
        width: 280,
        minHeight: "100vh",
        borderRight: "1px solid #e5e7eb",
        padding: "16px 12px",
        backgroundColor: "#f9fafb",
      }}
    >
      <h2 style={{ margin: "0 0 12px", fontSize: 16, color: "#111827" }}>메뉴</h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {tree.map((node) => (
          <TreeItem
            key={node.menuCode}
            node={node}
            expanded={expanded}
            onToggle={toggleNode}
          />
        ))}
      </ul>
    </aside>
  );
}
