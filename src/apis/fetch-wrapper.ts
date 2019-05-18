/**
 * @prop url - Location where the fetch reequest is being made
 * @prop method - Type of request being sent (GET, POST, PUT, PATCH or DELETE)
 * @prop contentType - Type of content being sent in the optional body payload
 * @prop bodyPayload (optional) - When provided is sent as the body  inside the initObject
 */
export interface FetchWrapperProps {
  url: string;
  method: string;
  contentType?: string;
  bodyPayload?: object;
}

export const fetchWrapper = async (fetchWrapperProps: FetchWrapperProps) => {
  const {
    url,
    method,
    contentType,
    bodyPayload,
  } = fetchWrapperProps;

  const initObj: RequestInit = {
    method,
    ...!!contentType && {
      headers: {
        'Content-Type': contentType,
      },
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
    throw error;
  }
};
