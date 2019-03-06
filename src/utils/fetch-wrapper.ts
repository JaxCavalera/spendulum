/**
 * @prop url - Location where the fetch reequest is being made
 * @prop method - Type of request being sent (GET, POST, PUT, PATCH or DELETE)
 * @prop binName - Where to perform CRUD operations to manage remote data
 * @prop bodyPayload (optional) - When provided is sent as the body  inside the initObject
 */
export interface FetchWrapperProps {
  url: string;
  method: string;
  binName: string;
  bodyPayload?: object;
}

export const fetchWrapper = async (fetchWrapperProps: FetchWrapperProps) => {
  const { url, method, binName, bodyPayload } = fetchWrapperProps;

  const secretKey = '$2a$10$FvactLzAWw.A5bf0sNeZheXmYdlULpRcaxp/4Yrd7dD7If4EMzZb6';
  const initObj = {
    method,
    headers: {
      "Content-Type": "application/json",
      'secret-key': secretKey,
      name: binName,
    },
    ...bodyPayload && { body: JSON.stringify(bodyPayload) },
  };

  try {
    const response = await fetch(url, initObj);

    if (response.ok) {
      return response.json();
    }

    // Something went wrong
    throw response;
  } catch (error) {
    return error;
  }
};
