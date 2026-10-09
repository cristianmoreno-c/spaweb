export default function Legal({ kind }: { kind: 'aviso' | 'privacidad' }) {
  const aviso = kind === 'aviso';
  return (
    <section className="section container narrow">
      <h1>{aviso ? 'Aviso legal' : 'Política de privacidad'}</h1>
      <p className="pending">Texto base editable. Completa los datos marcados antes de publicar y consulta a un profesional legal.</p>
      {aviso ? (
        <><p>Este sitio pertenece a Lumina Skin &amp; Body Spa, Barrio Estación Argentina, Calle San Rafael #71, Santa Cruz de la Sierra, Bolivia. Titular: [RAZON_SOCIAL_O_TITULAR]. NIT: [NIT].</p>
          <p>La información de este sitio es de carácter informativo. Los tratamientos son cosméticos y no sustituyen la atención médica.</p></>
      ) : (
        <><p>Los datos que envías en el formulario (nombre, teléfono, fecha y mensaje) se usan únicamente para contactarte y coordinar tu cita.</p>
          <p>No compartimos tus datos con terceros. Puedes pedir que los eliminemos escribiendo al WhatsApp +591 76084781. Responsable: [RAZON_SOCIAL_O_TITULAR].</p></>
      )}
    </section>
  );
}
