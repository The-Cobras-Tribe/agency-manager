import Card from './card';

function Grid() {
    return <section className='
    h-screen p-8
    overflow-auto
    grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <Card
            id='1'
            clientName='Client 1'
            contractorName='Contractor 1'
            date='2021-01-01'
            status='In Progress'
        />
        <Card
            id='2'
            clientName='Client 2'
            contractorName='Contractor 2'
            date='2021-01-01'
            status='In Progress'
        />
        <Card
            id='3'
            clientName='Client 3'
            contractorName='Contractor 3'
            date='2021-01-01'
            status='In Progress'
        />
    </section>
}

export default Grid;