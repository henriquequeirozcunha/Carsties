type DetailsProps = {
  id: string
}

function Details({ params }: { params: DetailsProps }) {
  return <div>{params.id}</div>
}

export default Details
