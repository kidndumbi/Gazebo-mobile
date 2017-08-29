export interface profile{

   first_name: string;
   last_name: string;
   email: string;
   nick_name: string;
   gender: 'male' | 'female';
   birthday: string;
   avatar: string;
   $key?: string;

}