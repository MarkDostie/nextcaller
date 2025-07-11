export async function getServerSideProps() {
  console.log(">>> getServerSideProps is running on the server <<<");
  return {
    props: {
      message: 'This is rendered server-side at request time',
      time: new Date().toISOString(),
    },
  };
}

export default function Test({ message }) {
   return (
    <div>
      <p>{message}</p>
      <p>{time}</p>
    </div>
  );
}
