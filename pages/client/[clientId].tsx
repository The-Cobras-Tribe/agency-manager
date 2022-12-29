import { useRouter } from 'next/router';

function ClientPage() {
    const router = useRouter();
    const { clientId } = router.query;

    return (
        <div>
            <p>Client ID: {clientId}</p>
        </div>
    );
}

export default ClientPage;