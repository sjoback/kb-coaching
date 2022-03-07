import GoBackButton from "components/GoBackButton";

function AddPage() {
    return (
        <div>
            <h1>add page</h1>

            <GoBackButton />
        </div>
    );
}

export default AddPage;

export async function getStaticProps({ params }) {
    const response = await fetch(
        `http://localhost:3000/api/add/${params.type}`
    );
    const data = await response.json();

    return {
        props: { type: data },
    };
}

export async function getStaticPaths() {
    const response = await fetch("http://localhost:3000/api/add");
    const addPaths = await response.json();

    return {
        paths: addPaths.map((path) => {
            return {
                params: {
                    type: path.type,
                },
            };
        }),
        fallback: false,
    };
}
