

设置 token 的位置代码: `org.apache.linkis.server.security.SSOUtils#setLoginUser`

最后会在 `/api/rest_j/v1/user/login` 接口返回的 headers 里面设置cookie 信息
`set-cookie:
linkis_user_session_ticket_id_v1=M7UZXQP9Ld3c02O8dj98rkXPc7V+yVUV2HLiVea4FcQ=; Path=/

`

如果超时,返回 cookie 失效的返回信息
```json
{
    "method": "/api/rest_j/v1/data-source-manager/info",
    "status": -1,
    "message": "errCode: 11002 ,desc: You are not logged in, please login first!(您尚未登录，请先登录!) ,ip: sz-margin-bigdata-xxjob ,port: 9001 ,serviceKind: linkis-mg-gateway",
    "data": {}
}
```

参考 java 代码

```scala
val timeoutUser = username + "," + System.currentTimeMillis
val key = "bdp-for-server"
val data = 'bfs_' + timeoutUser

val id = encrypt(data, key)
println(id)

```

```java
  public static String encrypt(String data, String key) throws Exception {
    if (StringUtils.isNotBlank(key) && key.length() < 8) {
      int i = key.length();
      while ((8 - i) > 0) {
        key += XBYTE;
        i++;
      }
    }
    byte[] bt = encrypt(data.getBytes(), key.getBytes());
    return Base64.getMimeEncoder().encodeToString(bt);
  }
```

```java 
  /**
   * Description Encryption based on key values(Description 根据键值进行加密)
   *
   * @param data
   * @param key Encryption key byte array(加密键byte数组)
   * @return Ciphertext(密文)
   * @throws Exception
   */
  private static byte[] encrypt(byte[] data, byte[] key) throws Exception {
    // Generate a trusted random number source(生成一个可信任的随机数源)
    SecureRandom sr = new SecureRandom();

    // Create a DESKeySpec object from the original key data（从原始密钥数据创建DESKeySpec对象）
    DESKeySpec dks = new DESKeySpec(key);

    // Create a key factory and use it to convert the DESKeySpec to a SecretKey
    // object（创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象）
    SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
    SecretKey securekey = keyFactory.generateSecret(dks);

    // The Cipher object actually completes the encryption operation.（Cipher对象实际完成加密操作）
    Cipher cipher = Cipher.getInstance(DES);

    // Initialize a Cipher object with a key（用密钥初始化Cipher对象）
    cipher.init(Cipher.ENCRYPT_MODE, securekey, sr);

    return cipher.doFinal(data);
  }
```
