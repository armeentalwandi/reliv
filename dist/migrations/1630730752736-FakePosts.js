"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakePosts1630730752736 = void 0;
class FakePosts1630730752736 {
    async up(queryRunner) {
        await queryRunner.query(`
        insert into post (title, text, "creatorId", "createdAt") values ('Tomorrow Never Dies', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 8, '2020-12-05T14:37:37Z');
insert into post (title, text, "creatorId", "createdAt") values ('Telefon', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 8, '2021-07-19T19:17:53Z');
insert into post (title, text, "creatorId", "createdAt") values ('Call Me Madam', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 8, '2021-07-16T05:25:52Z');
insert into post (title, text, "creatorId", "createdAt") values ('Man''s Job (Miehen työ)', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 8, '2021-06-15T04:07:43Z');
insert into post (title, text, "creatorId", "createdAt") values ('Blue', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 8, '2021-02-14T21:31:46Z');
insert into post (title, text, "creatorId", "createdAt") values ('Amen.', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 8, '2020-11-12T05:02:19Z');
insert into post (title, text, "creatorId", "createdAt") values ('Strange Case of Dr. Jekyll and Miss Osbourne, The (Dr. Jekyll and His Women) (Docteur Jekyll et les femmes)', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 8, '2020-11-04T03:58:09Z');
insert into post (title, text, "creatorId", "createdAt") values ('Irene in Time', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 8, '2020-12-09T23:16:46Z');
insert into post (title, text, "creatorId", "createdAt") values ('Kirikou and the Wild Beast (Kirikou et les bêtes sauvages)', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 8, '2021-05-20T02:01:53Z');
insert into post (title, text, "creatorId", "createdAt") values ('Greetings', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 8, '2021-02-13T01:36:04Z');
`);
    }
    async down(_) {
    }
}
exports.FakePosts1630730752736 = FakePosts1630730752736;
//# sourceMappingURL=1630730752736-FakePosts.js.map