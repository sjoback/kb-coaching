import Link from "next/link";

function DrillsPage({ data }) {
    return (
        <div>
            <h1>Drills</h1>
            <ul>
                {data.map((drill) => {
                    return (
                        <li key={drill.id}>
                            <Link href={`/drills/${drill.id}`}>
                                {drill.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <Link href="/drills/new">Add new drill</Link>
        </div>
    );
}

export default DrillsPage;

export async function getStaticProps() {
    const response = await fetch(`${process.env.API_URL}/drills`);
    const data = await response.json();
    console.log(data);

    return {
        props: { data },
    };
}
