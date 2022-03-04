function DrillPage({ drill }) {
  return <h1>{drill.name}</h1>;
}

export default DrillPage;

export async function getStaticProps({ params }) {
  const response = await fetch(`http://localhost:3000/api/drills/${params.id}`);
  const data = await response.json();

  return {
    props: { drill: data },
  };
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/drills");
  const drills = await response.json();

  return {
    paths: drills.map((drill) => {
      return {
        params: {
          id: drill.id,
        },
      };
    }),
    fallback: false,
  };
}
