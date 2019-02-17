
export const fetchCreateNewProduct = async (data: object) => {
  const secretKey = '$2a$10$FvactLzAWw.A5bf0sNeZheXmYdlULpRcaxp/4Yrd7dD7If4EMzZb6';
  const initObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'secret-key': secretKey,
      name: 'testbin'
    },
    body: JSON.stringify(data),
  };

  const route = 'https://api.jsonbin.io/b';

  const response = await fetch(route, initObj);
  console.log(response.json());
};
