import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteActivityCard } from "../../services/cardsServices";

const DeleteActivityCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    const remove = async () => {
      await deleteActivityCard(id);

      navigate("/cards/my-activity-cards");
    };

    remove();
  }, []);
};

export default DeleteActivityCard;
