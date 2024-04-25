# pub/sub pattern implementation with with replica and data persistence


## notes
 - do not forget to install concurrently globaly
```bash
npm install -g concurrently
```

## example of curl request

```bash
curl --header "Content-type: application/json" --request POST --data '{"from":"publisher 1","message":"hello subscribers"}' http://localhost:3030/publish

```
## redis streams
<p>
    and because of that redis pub/sub pattern lose data we use redis stream for presistance and messages won't be lost
</p>