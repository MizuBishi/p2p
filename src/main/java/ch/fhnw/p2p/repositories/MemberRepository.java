package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.repository.Repository;

import ch.fhnw.p2p.entities.Member;

@Transactional
public interface MemberRepository extends Repository<Member, Long> {
	Member save(Member member);
}
