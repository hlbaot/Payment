import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">404</p>
        <h1>Khong tim thay trang ban yeu cau.</h1>
        <p className="lede">
          Kiem tra lai duong dan hoac quay ve trang chu de tiep tuc thao tac.
        </p>
        <div className="actions">
          <Link className="button button-primary" href="/">
            Ve trang chu
          </Link>
        </div>
      </section>
    </main>
  );
}
