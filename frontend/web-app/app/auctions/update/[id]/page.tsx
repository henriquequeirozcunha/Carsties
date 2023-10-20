type UpdateProps = {
  id: string
}

function Update({ params }: { params: UpdateProps }) {
  return <div>Update for {params.id}</div>
}

export default Update
