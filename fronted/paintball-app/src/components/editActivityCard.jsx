import { Formik, useFormik } from "formik";
import Joi from "joi";
import FormikUsingJoi from "../utils/formikUsingJoi";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import Input from "../components/common/input";
import { updateActivityCard } from "../services/cardsServices";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useActivityCard from "../hooks/useActivityCard";
import { useAuth } from "../context/auth.context";
const EditActivityCard = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const { id } = useParams();
  console.log(id);
  const ActivityCard = useActivityCard(id);
  console.log(ActivityCard);
  useEffect(() => {
    if (!ActivityCard) {
      return;
    }

    /*only people who signed up as business can edit or create activities*/
    const {
      activityName,
      activityDescription,
      activityAddress,
      activityDate,
      bizUserPhone,
      bizUserName,
      activityImage,
      customerId,
    } = ActivityCard;
    form.setValues({
      activityName,
      activityDescription,
      activityAddress,
      activityDate,
      bizUserPhone,
      bizUserName,
      activityImage,
      customerId,
    });
  }, [ActivityCard]);
  const [errorApiRequest, setErrorApiRequest] = useState("");

  const form = useFormik({
    initialValues: {
      activityName: "",
      activityDescription: "",
      activityAddress: "",
      activityDate: "",
      bizUserPhone: "",
      bizUserName: "",
      activityImage: "",
      customerId: "",
    },
    validate: FormikUsingJoi({
      activityName: Joi.string().min(2).max(255).required(),
      bizUserName: Joi.string().min(2).max(255).required(),
      activityDescription: Joi.string().min(2).max(1024).required(),
      activityAddress: Joi.string().min(2).max(400).required(),
      bizUserPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      activityImage: Joi.string().min(11).max(1024),
      activityDate: Joi.date(),
      customerId: Joi.string().min(0).max(255).required(),
    }),
    onSubmit: async (values) => {
      // console.log("this is values:", values);
      try {
        const { activityImage, ...body } = values;
        console.log(values);
        if (activityImage) {
          body.activityImage = activityImage;
        }

        await updateActivityCard(id, values);
        navigate("/cards/my-activity-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setErrorApiRequest(response.data);
        }
      }
    },
  });

  console.log(Object.keys(form.errors));
  return (
    <>
      <PageHeader title={<h1>edit card page</h1>} />
      <p>you can edit the card by savig the new valus</p>
      <form
        style={{ maxWidth: "600px", margin: "auto" }}
        onSubmit={form.handleSubmit}
      >
        {errorApiRequest && (
          <div className="alert alert-danger">{errorApiRequest}</div>
        )}
        <Input
          onChange={form.handleChange}
          error={form.errors.activityName}
          name="activity-name"
          type="text"
          id="activity-name"
          {...form.getFieldProps("activityName")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityDescription}
          name="activity-Description"
          type="text"
          id="activity-Description"
          {...form.getFieldProps("activityDescription")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityDate}
          name="activityDate"
          type="date"
          id="activityDate"
          {...form.getFieldProps("activityDate")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityImage}
          name="activityImage"
          type="text"
          id="activityImage"
          {...form.getFieldProps("activityImage")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.activityAddress}
          name="activity-Address"
          type="text"
          id="activity-Address"
          {...form.getFieldProps("activityAddress")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.bizUserName}
          name="bizUserName"
          type="text"
          id="bizUserName"
          {...form.getFieldProps("bizUserName")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.bizUserPhone}
          name="bizUserPhone"
          type="text"
          id="bizUserPhone"
          {...form.getFieldProps("bizUserPhone")}
        />
        <Input
          onChange={form.handleChange}
          error={form.errors.customerId}
          name="customerId"
          type="text"
          id="customerId"
          {...form.getFieldProps("customerId")}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={Object.keys(form.errors).length}
        >
          edit card
        </button>
      </form>
    </>
  );
};
export default EditActivityCard;
