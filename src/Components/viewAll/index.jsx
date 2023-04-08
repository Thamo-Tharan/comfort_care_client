export const ViewAllcomponent = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  console.log(params.product);
  return (
    <div>
      <p>view all</p>
    </div>
  );
};
