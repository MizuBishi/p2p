package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.Student;

@Transactional
public interface MemberRepository extends JpaRepository<Member, Long> {

}
