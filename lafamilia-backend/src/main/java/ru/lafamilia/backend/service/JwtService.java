package ru.lafamilia.backend.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;
import ru.lafamilia.backend.model.User;
import ru.lafamilia.backend.repository.UserRepository;

@Service
public class JwtService {
    private static final String SECRET = "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855";
    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET);
    private static final JWTVerifier verifier = JWT.require(algorithm).build();

    private final UserRepository userRepository;

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getUserJWT(User user) {
        try {
            return JWT.create()
                    .withClaim("userId", user.getId())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Can't create JWT.");
        }
    }

    public User findUserByJWT(String jwt) {
        try {
            DecodedJWT decodedJwt = verifier.verify(jwt);
            return userRepository.findById(decodedJwt.getClaim("userId").asLong())
                    .orElse(null);
        } catch (JWTVerificationException exception) {
            return null;
        }
    }
}
