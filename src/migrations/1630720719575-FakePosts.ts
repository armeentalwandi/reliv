import {MigrationInterface, QueryRunner} from "typeorm";

export class FakePosts1630720719575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query (`insert into post (title, text, "creatorId") values ('Shatter Dead', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

        Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.
        
        Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 12);
        insert into post (title, text, "creatorId") values ('Newest Pledge, The', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 13);
        insert into post (title, text, "creatorId") values ('Michael Jackson''s This Is It', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. 
        Phasellus in felis. Donec semper sapien a libero. Nam dui.', 15);
        `
        )
        };

    public async down(_: QueryRunner): Promise<void> {


    }
}
