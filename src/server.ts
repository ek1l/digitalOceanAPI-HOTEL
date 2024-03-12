import { app } from './app';
import { main } from './database';

app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${process.env.PORT} successfully!`)
    main()
});
