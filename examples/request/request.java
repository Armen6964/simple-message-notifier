OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
RequestBody body = RequestBody.create(mediaType, "sender=Server&tz=%2B6&ip=192.168.0.1&message=Message&keyStorage=%7B%7D&deliveryDate=2020-04-18%2015%3A40%3A10&schedulingTypeId=1&title=MyMessage&recipients=%5B%0A%20%20%7B%0A%20%20%20%20%22clientId%22%3A1%2C%0A%20%20%20%20%22push_web%22%3A%22dW5mSGcenkTIO4u-yUfasB%3AAPA91bHHMhQh6DVjMiBCZzozZnS13VsbRdzpQta1cq7OPG5vocKPbn1FyRN0wLXjdewteNOAmGlfkBbQPldYsmjXD7XiqL0-fGtUoDEf9KKsufmMwPBBb3gxKqklru31m3apNodK5I5z%22%2C%0A%20%20%20%20%22push_android%22%3A%20%22%22%2C%0A%20%20%20%20%22push_ios%22%3A%20%22%22%2C%0A%20%20%20%20%22push_windows%22%3A%20%22%22%2C%0A%20%20%20%20%22push_macOS%22%20%3A%20%22%22%2C%0A%20%20%20%20%22emails%22%20%3A%20%22root%40inorain.com%22%2C%0A%20%20%20%20%22phone_number%22%20%3A%20%22%2B37498041171%22%2C%0A%20%20%20%20%22options%22%20%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22clientId%22%3A2%2C%0A%20%20%20%20%22push_web%22%3A%22e8kWcM6-oMdH7C-zachXTa%3AAPA91bHfFMkGrXazkxDry5yNdeNHSOzx6eJ5zqBBGXjd09tLFw7d53pCOM3RPk_R_hbLFeRm1AOnGKKeIcqmQxNSC4KDNu38RPnsmckrmGCbHLvpKinnSKa-GHGYoWsBHJBdfPfJAFfy%22%2C%0A%20%20%20%20%22push_android%22%3A%20%22%22%2C%0A%20%20%20%20%22push_ios%22%3A%20%22%22%2C%0A%20%20%20%20%22push_windows%22%3A%20%22%22%2C%0A%20%20%20%20%22push_macOS%22%3A%20%22%22%2C%0A%20%20%20%20%22emails%22%20%3A%20%22grigor%40inorain.com%22%2C%0A%20%20%20%20%22phone_number%22%20%3A%20%22%2B37494511116%22%2C%0A%20%20%20%20%22options%22%20%3A%20%7B%7D%0A%20%20%7D%0A%5D%0A");
Request request = new Request.Builder()
  .url("https://192.168.1.170:8020/add")
  .post(body)
  .addHeader("content-type", "application/x-www-form-urlencoded")
  .addHeader("cache-control", "no-cache")
  .addHeader("postman-token", "3cf63f22-ff1c-1c24-27ba-5c7c6289a779")
  .build();

Response response = client.newCall(request).execute();
