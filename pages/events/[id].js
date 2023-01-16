import Image from 'next/image'
import React from 'react'

export default function EventsCatPage({ data, pageName }) {
  return (
    <main style={{ width: '80%', margin: 'auto' }}>
      <h2>Events in {pageName}</h2>
      <div style={{ padding: '3rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {data.map((event) => (
            <div
              key={event.id}
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Image
                src={event.image}
                alt={event.image}
                width={300}
                height={200}
              />
              <h2 style={{ marginTop: '1.5rem' }}>{event.title}</h2>
              <p style={{ marginTop: '2.5rem' }}>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json')
  const allPaths = events_categories.map((ev) => {
    return {
      params: { id: ev.id }
    }
  })
  return { paths: allPaths, fallback: false }
}

export async function getStaticProps(context) {
  const id = context?.params.id
  const { allEvents } = await import('/data/data.json')
  const data = allEvents.filter((ev) => ev.city === id)
  return { props: { data, pageName: id } }
}
