export default function toQueryString(params: {[key: string]: string}) {
  return "?" +
    Object.entries(params)
      .map(([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
}
