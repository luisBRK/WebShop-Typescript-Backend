import { Response } from "express";
import { InterfaceService } from "../interfaces/system";
import localize_directory from "../helpers/localizeDirectory";

interface ISendResponseProps {
  res: Response;
  response: InterfaceService<object>;
  locale?: string;
  status?: number;
}

const sendResponse = (props: ISendResponseProps) => {
  let { res, response, locale = "default" } = props;

  if (response?.result) {
    res.json(response.result);
  } else if (response?.error) {
    // res.json({ errors: { message: response.error } });
    let error =
      localize_directory.localize_directory[locale][response.error] ??
      response.error;

    res.json({ errors: { message: error } });
  }
};

export default sendResponse;
