import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

// 各ポリシーページ本体は Tailwind で組まれているため、.v-site のスコープ外に置く
// （スコープ内の要素リセットが Tailwind のユーティリティより優先されてしまうため）
export default function PoliciesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="v-site"><SiteNav /></div>
      <main>{children}</main>
      <div className="v-site"><SiteFooter /></div>
    </>
  );
}
