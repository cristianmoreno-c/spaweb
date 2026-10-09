import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <section className="section container center notfound">
      <p className="trust">Error 404</p><h1>Esta página no existe.</h1>
      <p>Quizás el enlace cambió. Vuelve al inicio y encuentra tu tratamiento.</p>
      <Link className="btn btn-primary" to="/">Volver al inicio</Link>
    </section>
  );
}
