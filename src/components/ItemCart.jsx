const ItemCart = ({ item }) => {
  return (
    <tr>
      <td>
        <img
          src={`img/${item.image}.jpg`}
          alt={item.name}
          className="img-fluid" />
      </td>

      <td>
        {item.name}
      </td>

      <td className="fw-bold">
        ${item.price}
      </td>

      <td className="flex align-items-start gap-4">
        <button
          type="button"
          className="btn btn-dark">
          -
        </button>

        {item.quantity}

        <button
          type="button"
          className="btn btn-dark">
          +
        </button>
      </td>

      <td>
        <button
          type="button"
          className="btn btn-danger">
          X
        </button>
      </td>
    </tr>
  )
}

export default ItemCart