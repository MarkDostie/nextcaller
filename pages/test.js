export async function getServerSideProps() {
  return {
    props: {
      message: 'This is rendered server-side at request time',
    },
  };
}

export default function Test({ message }) {
  return <div>{message}</div>;
}
