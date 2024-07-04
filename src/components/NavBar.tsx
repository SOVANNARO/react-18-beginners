interface Props {
  cardItemCount: number;
}

function NavBar({ cardItemCount }: Props) {
  return (
    <div>
      <h1>NavBar</h1>
      <h2>{cardItemCount}</h2>
    </div>
  );
}

export default NavBar;
