## API Access Point

    API adress: http://enigmatic-temple-42944.herokuapp.com/
    

|  Method | Access Point                 | Explanation                                                                                                                                                                                              |
| -----: | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    GET | `/users/addUser`                       | Helps us register to the database                                                                    |
|    GET | `/users/authenticate`                   | `Token` information is received with the registered information                                                                               |
|    GET | `/api/menu`       | used to get all restaurant information                                                                               |
|    POST | `/api/menu`     | used to add restaurant information                                                                               |
|   DELETE | `/api/menu/:id`                       | delete restaurant with `id` information                                    |
|    GET | `/api/detail`                   | detailed information of the restaurant is accessed                    |
|    POST | `/api/detail` | used to add detailed information to the restaurant  |
| DELETE | `/api/detail/:id`                  | used to delete detail information with `id`                                                      |  |
| PUT | `/api/detail/:id` | used to update detail information with `id`                                             |  |
