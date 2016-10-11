package ch.fhnw.p2p.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.p2p.entities.Project;

@Transactional
public interface ProjectRepository extends JpaRepository<Project, Long> {

	Project findByIdAndStatus(Long id, Project.Status status);
}
