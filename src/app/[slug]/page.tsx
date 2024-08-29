import React from 'react'

interface ParamsProps {  
  params: {
    slug: string;
  }
}

export default function SinglePageRoute({ params }: Readonly<ParamsProps>) {
  return (
    <div>
      <h1>Page {params.slug}</h1>
    </div>
  )
}
