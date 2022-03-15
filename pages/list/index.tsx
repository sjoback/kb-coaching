import Link from "next/link";
import { useEffect, useState } from "react";

function ListPage({ data }) {
    const [type, setType] = useState(String);

    useEffect(() => {
        setType("test");
    }, []);
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

            <Link href="/drills/new">Add new {type}</Link>
        </div>
    );
}

export default ListPage;

export async function getStaticProps({ params }) {
    const response = await fetch(`${process.env.API_URL}/list`);
    const data = await response.json();
    console.log(data);

    return {
        props: { data },
    };
}

export async function getStaticPaths() {
    // const response = await fetch(`http://localhost:3005/api/list`);
    const response = await fetch(`${process.env.API_URL}/list`);
    const paths = await response.json();

    return {
        paths: paths.map((path: any) => {
            return {
                params: {
                    type: path.type,
                },
            };
        }),
        fallback: false,
    };
}
