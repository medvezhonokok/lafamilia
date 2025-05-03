package ru.lafamilia.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.lafamilia.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = """
            SELECT * FROM users 
            WHERE login=?1 and password_sha=SHA1(CONCAT(?2, 'fe83d2afe7e1b4a547584bb80b35b3525456e5d120fa7e50508f6529058c3b85'))
            """, nativeQuery = true)
    User findByLoginAndPassword(String login, String password);
}
