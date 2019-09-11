export const SAVE_BOOKING_EXAMPLE_DATA = `{"booking_token":"default:default","baggage":[{"combination":{"conditions":{"passenger_groups":["adult","child"]},"indices":[0,1],"price":{"amount":0,"base":0,"currency":"EUR","service":0,"service_flat":0}},"passengers":[0]},{"combination":{"conditions":{"passenger_groups":["adult","child"]},"indices":[],"price":{"amount":0,"base":0,"currency":"EUR","service":0,"service_flat":0}},"passengers":[0]}],"additional_services":{"priority_boarding":{},"airhelp_plus":false,"fast_track":[],"blueribbon_bags":null,"seating":null},"passengers":[{"surname":"TEST","name":"TEST","title":"mr","birthday":946684800,"category":"adult","nationality":"gb","insurance":"none","cardno":null,"expiration":null,"email":"test@kiwi.com","phone":"+44 000"}],"payment_gateway":"payu","use_credits":false,"currency":"eur","newsletter":false,"override_duplicate_booking_warning":false,"grace_period":false,"grace_period_offered":false,"price":100,"orig_pnum":{"adult":1,"teen":0,"child":0,"infant":0},"accepted_price":100,"total_price_in_currency":100,"affily":"skypicker","utm":{},"gwm":{"sub2":null,"postback":null},"exponea_cookie":"a653538d-97a1-447f-9b34-9a2bb05989ba","brand":"kiwicom","booked_at":"skypicker","lang":"en","locale":"en-GB","visitor_uniqid":"49c95628-b3cd-4ec6-8e50-8071a46a04bf","is_tat_informed":false}`;

const SAVE_BOOKING_API =
  "https://skymock.skypicker.com/api/v0.1/save_booking?v=2";

export const saveBooking = async (context, event) => {
  const response = await fetch(SAVE_BOOKING_API, {
    method: "POST",
    body: JSON.stringify(event.data),
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());

  return response;
};
